<?php

namespace App\Repositories;

use App\Models\ApprovalApi;
use App\Repositories\ApprovalApiRepositoryInterface;


class ApprovalApiRepository implements ApprovalApiRepositoryInterface
{

    public function get()
    {
        $apiUrls = ApprovalApi::where('status', 'active')->get();
        return $apiUrls;
    }

}