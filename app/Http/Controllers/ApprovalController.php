<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class ApprovalController extends Controller
{
    public function getPending()
    {

        $pending = [];

        
        $client = new \GuzzleHttp\Client();
        $request = $client->get('http://localhost/ipc_central/sys_administration/sys_general_admin/sys_gatepass/apis/pending.php?employee_no=150603');
        $response = $request->getBody();
         
        return response()->json($response);
    }
}
