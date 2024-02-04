// Verificar si el usuairo esta autenticado
function verifySession(req, res, next) {
    if (req.session.usuario) {
        // El usuario está autenticado, permitir el acceso
        next();
    } else {
        // El usuario no está autenticado, redirigir a la página de inicio de sesión
        res.redirect('/login');
    }
}

module.exports = { verifySession };
