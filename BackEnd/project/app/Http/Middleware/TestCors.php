<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TestCors{
    public function handle(Request $request, Closure $next)
    {   
        // if($request->method()=="OPTIONS"){
        //     $message ="test";
        //     return response($message, 200);
        // }
        
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', '*');
        
        
    }
}
