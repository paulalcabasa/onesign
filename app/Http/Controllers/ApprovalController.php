<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Repositories\ApprovalApiRepositoryInterface;

class ApprovalController extends Controller
{   

    private $approvalApiRepository;
    private $user;

    public function __construct(ApprovalApiRepositoryInterface $approvalApiRepository)
    {
        $this->approvalApiRepository = $approvalApiRepository;
        $this->user = auth()->user();
    }

    public function getPending(Request $request)
    {

        // table for api urls for systems
        $apiUrls = $this->approvalApiRepository->get();
       
        /*
         * Variable to store all pending requests
         * 
         */
        $pending = [];

        foreach($apiUrls as $api){
            $client = new \GuzzleHttp\Client();
            $request = $client->request('GET', $api->api_url . $this->user->employee_no);
            $response = $request->getBody();
            $data = json_decode($response);
            foreach($data as $row){
                array_push($pending, [
                    'system'  => $api->system_name,
                    'description'  => $row->description,
                    'reference_no' => $row->reference_no,
                    'status'       => $row->status,
                    'request_date' => $row->request_date,
                    'view_url'     => $row->view_url
                ]);
            }
        }

        for($i = 1; $i <= 50; $i++){
            array_push($pending, [
                'system' => 'Courier request',
                'description' => 'test',
                'reference_no' => 'test',
                'status' => 'pending',
                'request_date' => 'yo',
                'view_url' => 'ye'
            ]);
        }

        for($i = 1; $i <= 50; $i++){
            array_push($pending, [
                'system' => 'PPS',
                'description' => 'test',
                'reference_no' => 'test',
                'status' => 'pending',
                'request_date' => 'yo',
                'view_url' => 'ye'
            ]);
        }

        array_push($pending, [
            'system' => 'PPS',
            'description' => 'test 12190',
            'reference_no' => 'test',
            'status' => 'pending',
            'request_date' => 'yo',
            'view_url' => 'ye'
        ]);
        
        array_push($pending, [
            'system' => 'VIP Coupon',
            'description' => 'test 12190',
            'reference_no' => 'test',
            'status' => 'pending',
            'request_date' => 'yo',
            'view_url' => 'ye'
        ]);
        
        array_push($pending, [
            'system' => 'FROS',
            'description' => 'test 12190',
            'reference_no' => 'test',
            'status' => 'pending',
            'request_date' => 'yo',
            'view_url' => 'ye'
        ]);

        array_push($pending, [
            'system' => 'NOS',
            'description' => 'test 12190',
            'reference_no' => 'test',
            'status' => 'pending',
            'request_date' => 'yo',
            'view_url' => 'ye'
        ]);
        
        return response()->json($pending);
    }
}
