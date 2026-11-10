import { browserSupportsWebAuthnAutofill, startAuthentication } from '@simplewebauthn/browser';
import $ from 'jquery';
import Notification from 'vj/components/notification';
import { AutoloadPage } from 'vj/misc/Page';
import { i18n, request } from 'vj/utils';

function getLoginUrl() {
  const navLogin = $('[name="nav_login"]');
  return navLogin.length > 0 ? navLogin.attr('href') : '/login';
}

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

const signinDialogPage = new AutoloadPage('signinDialogPage', null, () => {
  let authnInitialized = false;

  async function initPasskey() {
    if (authnInitialized || !window.isSecureContext) return;
    authnInitialized = true;
    const support = await browserSupportsWebAuthnAutofill().catch(() => false);
    if (!support) return;
    const authnInfo = await request.get('/user/webauthn', { login: true }).catch(() => null);
    if (!authnInfo?.authOptions) return;
    const result = await startAuthentication({ optionsJSON: authnInfo.authOptions, useBrowserAutofill: true })
      .catch((e) => {
        Notification.error(i18n('Failed to get credential: {0}', e));
        return null;
      });
    if (!result) return;
    try {
      const authn = await request.post('/user/webauthn', {
        result,
      });
      if (authn.url) window.location.href = authn.url;
      else if (authn.error) throw new Error(authn.error);
    } catch (err) {
      Notification.error(err.message);
      console.error(err);
    }
  }

  const isLoginPage = normalizePath(window.location.pathname).endsWith('/login');
  const isIpHost = /^\d{1,3}(\.\d{1,3}){3}$/.test(window.location.hostname) || window.location.hostname.includes(':');
  if (isLoginPage && !isIpHost) initPasskey();

  // All login entrances lead to the standalone login page.
  window.showSignInDialog = () => {
    const loginUrl = new URL(getLoginUrl(), window.location.origin);
    if (normalizePath(loginUrl.pathname) === normalizePath(window.location.pathname)) {
      $('input[name="uname"]').trigger('focus');
      return;
    }
    loginUrl.searchParams.set('redirect', window.location.pathname + window.location.search + window.location.hash);
    window.location.href = loginUrl.toString();
  };
});

export default signinDialogPage;
