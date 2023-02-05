<?php
namespace App\Http\Middleware;
use Closure;

class ExMiddleware{
    public function handle($request, Closure $next)
    {   echo "Next Global Middleware is here.";
         return $next($request);
    }
}
