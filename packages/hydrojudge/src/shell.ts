// Path to the POSIX shell used by checkers / compile scripts / stack limit probing.
// Upstream Hydro assumes Linux where the shell lives at /bin/bash. On Windows
// (or any host where bash is installed elsewhere) set HYDRO_BASH to the bash
// executable, e.g. HYDRO_BASH=C:/Program Files/Git/bin/bash.exe.
export function bash(): string {
    const path = process.env.HYDRO_BASH || '/bin/bash';
    return path.includes(' ') ? `"${path}"` : path;
}
