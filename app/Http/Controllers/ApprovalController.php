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


        return response()->json($pending);
    }
}
