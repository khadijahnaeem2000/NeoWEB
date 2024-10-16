<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
class AlertController extends Controller
{
    public function newsUnseenCount(Request $request){
        $studentId=$request->json('studentId');
        $ue=\App\User::where('id',$studentId)->exists();
        if($ue==false){
            return response()->json(['status'=>'Unsuccessfull','message'=>'User not found']);
        }
        $u=\App\User::find($studentId);
        if($u->field1x=="Bloquear"){
            return response()->json(['status'=>'Unsuccessfull','message'=>'User not found']);
        }
    	$count=\App\AlertRecord::where('studentId',$request->json('studentId'))
    	->where('status','unseen')->count();
    	return response()->json(['status'=>'Successfull','data'=>$count]);
    }
    public function allNews(Request $request){
        $studentId=$request->json('studentId');
        $tab=$request->json('tab');
        $ue=\App\User::where('id',$studentId)->exists();
        if($ue==false){
            return response()->json(['status'=>'Unsuccessfull','message'=>'User not found']);
        }
        $u=\App\User::find($studentId);
        if($u->field1x=="Bloquear"){
            return response()->json(['status'=>'Unsuccessfull','message'=>'User not found']);
        }
    	$news=\App\AlertRecord::where('studentId',$request->json('studentId'))->orderBy('OrderNumber','Desc')->get();
    	foreach ($news as $key => $value) {
    		$d=Carbon::parse($value->created_at)->day;
    		$m=Carbon::parse($value->created_at)->month;
    		$y=Carbon::parse($value->created_at)->year;
    		$newsDate="$d/$m/$y";
    		$value->setAttribute('newsDate',$newsDate);
    	}
    	$news2=\App\AlertRecord::where('studentId',$request->json('studentId'))->orderBy('OrderNumber','Desc')->get();
    	foreach ($news2 as $key => $value) {
    		$value->status="seen";
    		$value->save();
            
    	}
        if(!empty($tab)){
            if(!empty($news)){
                foreach ($news as $key => $value) {
                    $str=str_replace('font-size: 13pt','font-size: 30px',$value->news);
                    $str=str_replace('font-size: 13px', 'font-size: 30px', $str);
                    $value->setAttribute('news',$str);
                }
            }
        }
    	return response()->json(['status'=>'Successfull','data'=>$news]);
    }
}
