/***
 * @todo Redirect the user to login page if token is not present.
 */
if(localStorage.token===undefined)
{
    window.location.href = '/login';
}