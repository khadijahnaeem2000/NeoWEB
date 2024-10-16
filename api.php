<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\TikTokController;
use App\Http\Controllers\API\ProductShippingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('getAllProductShipping',[ProductShippingController::class,'getAllProductShipping']);
Route::post('getAllTiktoks', [TikTokController::class, 'getAllTikToks']);
Route::get('fetchAllTikTokFolder',[TikTokController::class,'fetchAllFolder']);
Route::post('LoginwithApple','SocialAuthenticationController@loginWithAppleForApp');
Route::get('DeleteInActiveSubscription','UserCronController@DeleteInActiveSubscription');
Route::get('AddDeductDays','UserCronController@AddDeductDays');
Route::get('addcontactBrevo','BrevoController@addcontact');
Route::get('SubscriptionActivationCron','API\UserController@SubscriptionActivation');
Route::get('DeleteCoupon','API\CouponController@deleteCoupons');
Route::post('SubscriptionActivation','API\UserController@PauseSubscription');
Route::post('CheckCoupon','API\CouponController@checkCoupon');
Route::post('RegisterWebsite','SocialAuthenticationController@registerwordpress');
Route::post('LoginWebsite','SocialAuthenticationController@LoginWebsite');
Route::get('productslist','API\ProductController@productslist');
Route::get('Userotp','API\UserController@otpfortesting');
Route::post('Registerwith30days','StripeController@registerfor30days');
Route::get('TelephoneVerification','API\UserController@IsTelephonenumberVerified');
Route::get('/loginGoogleWebversion/{email}/{firstname}/{lastname}/', [UserController::class, 'loginForwebversion']);
Route::post('loginwithGoogleOrAppleId','API\UserController@login');
Route::get("paymentsubscriptionplan2024",'stripepaymentsController@paymentsubscriptionplan2024'); 

Route::post('telephoneVerfication','API\UserController@telephoneVerfication');
Route::get("deleteBlockusernotifcation",'API\StudentController@deletebolcknoti');
Route::post('updatebaremo','API\RankingController@UserBaremo');
//
Route::get('totalpaycron','StripeInvoiceController@totalpaycron');
//apis for the classcomments
Route::post('sendcomments','API\ClasscommentsController@makecomments');
Route::post('getcomments','API\ClasscommentsController@getcomments');
Route::post('addlike','API\ClasscommentsController@makelikes');
Route::post('getlike','API\ClasscommentsController@getlikes');
//
Route::post('getAllExamsOfFolderSequence', 'API\ExamController@getAllExamsOfFolderSeq');
Route::post('getAllExamsOfFolderApp', 'API\ExamController@getAllExamsOfFolderApp');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('payment-successnew', 'StripeController@paymentSuccessfor18');
Route::post('product-success', 'StripeController@productSucesss');
Route::post('thankyoudata', 'PagesController@saveregistereddata')->name('thankyoudata');
//Route::post('user','TestController@us');
Route::get('savephone','StripeInvoiceController@savephone');
Route::get('stripein','StripeInvoiceController@stripeInvoicescron');
Route::post('user','API\StudentController@user');
Route::get('/CheckUnInstalledUser','API\NotificationsController@CheckUnInstalledUser');
Route::get('blockuser','API\StudentController@blockuser');//new
Route::get('userTrialEnd','API\StudentController@endOfTrial');
Route::post('getFiles','API\MaterialController@getFiles');
Route::post('registerStudent','API\StudentController@registerStudent');
Route::post('loginStudent','API\StudentController@loginStudent');
Route::post('logoutStudent','API\StudentController@logoutStudent');
Route::get('getAudios','API\MaterialController@getAudios');
Route::get('getPdfs','API\MaterialController@getPdfs');
Route::post('emailSubscription','API\StudentController@emailSubscription');
Route::post('activateUser','API\StudentController@userPaidActivation');
Route::post('rescheduleExamAll','API\StudentController@rescheduleExamAll');

//download and uploads
Route::post('getUploadFolders','API\DownloadUploadController@getUploadFolders');
Route::post('getDownloadFolders','API\DownloadUploadController@getDownloadFolders');
Route::post('getDownloadFiles','API\DownloadUploadController@getDownloadFiles');
Route::post('uploadFile','API\DownloadUploadController@uploadFile');

//download and upload for pfd
Route::post('getUploadPdfFolders','API\DownloadUploadController@getUploadPdfFolders');
Route::post('getDownloadPdfFolders','API\DownloadUploadController@getDownloadPdfFoldersNew');
Route::post('getDownloadPdfFiles','API\DownloadUploadController@getDownloadPdfFilesNew');
Route::post('uploadPdfFile','API\DownloadUploadController@uploadPdfFile');

//For audio / video / pdf
Route::post('getTopics','API\MaterialController@getTopicsNew');
Route::post('getTopicsNew','API\MaterialController@getTopics');
Route::post('getAudioFiles','API\MaterialController@getAudioFilesnew');
Route::post('getAudioFilesNew','API\MaterialController@getAudioFilesnew');
Route::post('getVideoFiles','API\MaterialController@getVideoFilesnew');
Route::post('getVideoFilesNewk','API\MaterialController@getVideoFilesnew');
Route::post('getPdfFiles','API\MaterialController@getPdfFiles');

Route::get('uploadSpinner','API\MaterialController@uploadSpinner');

Route::post('getAllExamFolders','API\ExamController@getAllExamFoldersNew');
Route::post('getAllExamsOfFolder','API\ExamController@getAllExamsOfFolderNew');
Route::post('getAllExams','API\ExamController@getAllExams');
Route::post('getAllExam','API\ExamController@getAllExam');
Route::post('questionqueries','API\ExamController@postquestionerror');

Route::post('startExam','API\ExamController@startExam');

Route::post('storeAnswer','API\ExamController@storeAnswer');
Route::post('pauseAnswer','API\ExamController@pauseAnswer');
Route::post('endExam','API\ExamController@endExam');
Route::post('reviewExam','API\ExamController@reviewExam');
Route::post('endReview','API\ExamController@endReview');

Route::get('timeTest','API\ExamController@timeTest');
Route::get('getRecords','API\ExamController@getRecords');

Route::get('getStudents','API\ExamController@getStudents');
Route::get('getExams','API\ExamController@getExams');
Route::get('getFolders','API\ExamController@getFolders');

Route::post('getFaqFolders','API\FaqController@getFaqFolders');
Route::post('getFolderFaqs','API\FaqController@getFolderFaqs');

Route::post('faqSearch','API\FaqController@faqSearch');


Route::post('getAllPersonalityExams','API\PersonalityController@getAllPersonalityExamsNew');
Route::post('getAllReviewExams','API\ReviewController@getAllReviewExams');

Route::post('getAllReviewFolders','API\ReviewController@getAllReviewFoldersNew');
Route::post('getReviewFolderExams','API\ReviewController@getreviewFolderExamsNew');

//Api to anble rapaso exam status
Route::post('reviewStatus','API\ReviewController@updateStatus');

Route::post('newsUnseenCount','API\AlertController@newsUnseenCount');
Route::post('allNews','API\AlertController@allNews');

Route::post('surveyList','API\SurveyController@surveyList');
Route::post('getSurveyQuestions','API\SurveyController@getSurveyQuestions');

Route::post('getSurveyTest','API\SurveyController@getSurveyTest');

Route::post('storeChatStudent','API\ChatController@storeChatStudent');
Route::post('storeChatTeacher','API\ChatController@storeChatTeacher');
Route::post('getChat','API\ChatController@getChat');

Route::post('chatCount','API\ChatController@chatCount');
Route::post('getTopicCourseVerticalRanking','API\RankingController@getTopicCourseVerticalRanking');
Route::post('getTopicCourseHorizontalRanking','API\RankingController@getTopicCourseHorizontalRanking');
Route::post('getTopicCourseHorizontalRanking2','API\RankingController@getTopicCourseHorizontalRanking2');

Route::post('getCourseVerticalRanking','API\RankingController@getCourseVerticalRanking');

Route::post('audios','API\ObjectiveController@audios');
Route::post('videos','API\ObjectiveController@videos');
Route::post('estudioTemario','API\ObjectiveController@estudioTemario');
Route::post('repasoTemario','API\ObjectiveController@repasoTemario');
Route::post('getObjectives','API\ObjectiveController@getObjectives');

Route::post('getObjectivesDb','API\ObjectiveController@getObjectivesDb');
Route::post('deleteObjectivesDb','API\ObjectiveController@deleteObjectivesDb');
Route::post('objectiveRanking','API\ObjectiveController@objectiveRanking');

Route::post('reviewDrawr','API\ExamController@reviewDrawr');

Route::post('checkNotifications','AdminController@checkNotifications');

Route::post('checkNotif','AdminController@checkNotif');

Route::post('onExam','AdminController@onExam');
Route::post('getDates','AdminController@getDates');
Route::post('getCourseVerticalRankingTest','AdminController@getCourseVerticalRanking');

Route::post('pdfCounter','API\ObjectiveController@pdfCounter');

// Push Notifications Api Routes
Route::post('/device-key', 'API\NotificationsController@update_user_deviceKey');
Route::get('/send_scheduled_notification', 'API\NotificationsController@sendschedulenotifications');
Route::post('battle/send-web-notification-battle', 'API\NotificationsController@sendWebNotificationBattle')->name('send.web-notification-battle');

// Vertical Videos Api Routes
Route::get('/activate-videos', 'API\VideosController@activate');
Route::post('/fetch-videos', 'API\VideosController@fetch');
Route::post('/like-video', 'API\VideosController@thumbs_up');

// In-App Purchase - 20211019
Route::post('packages','API\InAppPurchaseController@getPackages');
Route::post('products','API\InAppPurchaseController@getProducts');
Route::post('package','API\InAppPurchaseController@get_package_data');
Route::post('subscribe','API\InAppPurchaseController@pacakgeSubscribe');
Route::post('success','API\InAppPurchaseController@paymentSuccess');
Route::post('blocked','API\InAppPurchaseController@blockUser');
Route::post('verify','API\InAppPurchaseController@iosExpireUser');
Route::post('cancel','API\InAppPurchaseController@cancelSubscription');

// Class Topics Api Routes
Route::post('/getClassTopics', 'API\ClassesController@getTopics');
Route::post('/getClassTopicsMaterial', 'API\ClassesController@getTopicMaterial');
Route::post('/getClassTopicsMaterialtest', 'API\ClassesController@getTopicMaterialtest');

Route::post('getAllPrograms','API\ProgramController@getPrograms');
Route::post('getProgramActivities','API\ProgramController@getProgramActivities');
Route::post('removeActivity','API\ProgramController@removeActivity');
Route::post('completeActivity','API\ProgramController@completeActivity');
Route::post('resetprogram','API\ProgramController@resetprograms');


///----------------Gamification---------------///
Route::post('avatar/store','API\GamificationController@avatarstore');
Route::post('rank/store','API\GamificationController@rankStore');
Route::get('getRankAvatar','API\GamificationController@getRankAvatar');
Route::get('getUser','API\GamificationController@getUser');
Route::post('profile','API\GamificationController@profile');
Route::post('updateProfile','API\GamificationController@updateProfile');
Route::get('userProfile','API\GamificationController@userProfile');
Route::get('updateProfilee','API\GamificationController@updateProfilee');
Route::get('findUser','API\GamificationController@findUser');
Route::post('saveExperience','API\GamificationController@saveExperience');
Route::post('updateExperience','API\GamificationController@updateExperience');
Route::post('rank-image-update','API\GamificationController@rankImageUpdate');
Route::get('curl','API\GamificationController@curl');
Route::get('getcontact','API\GamificationController@getcontact');
Route::post('MobileOTP','API\GamificationController@MobileOTP');
Route::post('verifyOTP','API\GamificationController@verifyOTP');
Route::get('Reasons','API\GamificationController@Reasons');
Route::post('user/feedback','API\GamificationController@feedback');
Route::post('JwtToken','API\GamificationController@generateJWTKey');
Route::post('loginTime','API\GamificationController@loggedInUser');
Route::post('logoutTime','API\GamificationController@logoutUser');
Route::get('getUserNew','API\GamificationController@getUsernew');


// Coupon System
Route::get('coupons','API\CouponController@getCoupons');
Route::post('coupon','API\CouponController@applyCoupon');

//Battle Work
Route::get('battles','API\BattleController@getBattles');
Route::post('battle/create','API\BattleController@createBattle');
Route::post('battle/exams','API\BattleController@createBattleExam');
Route::post('battle/reviews','API\BattleController@createBattleReview');
Route::post('battle/personalities','API\BattleController@createBattlePersonal');
Route::post('battle/allTypes','API\BattleController@getAllTypeExams');

//new and working battle apis
Route::post('battle/ActiveBattles','API\BattleController@activeBattles');
Route::post('battle/allTestTypes','API\BattleController@getAllTestType2');
Route::post('battle/allTestTypes2','API\BattleController@getAllTestType2');
Route::post('battle/finishedbattle','API\BattleController@getAllFinshedBattle');
Route::post('battle/createbattle','API\BattleController@createbattles');
Route::post('battle/viewallusersforinvitation','API\BattleController@ViewUsersForInvitation');
Route::post('battle/sendbattleinvitation','API\BattleController@SendBattleInviatation');
Route::post('battle/viewbattleinvitation','API\BattleController@viewInvites');
Route::post('battle/joinbattle','API\BattleController@joinbattle');
Route::post('battle/startbattle','API\BattleController@startbattle');
Route::post('battle/startbattle2','API\BattleController@startbattle2');
Route::post('battle/leavebattle','API\BattleController@leavebattle');
Route::post('battle/higestscore','API\BattleController@higestscore');
Route::post('battle/checkanswer','API\BattleController@checkanswer');

//video Conference
Route::middleware(['cors'])->group(function () {
    Route::get('get/conference/link','API\VideoConferenceController@getlink')->name('get.video.link');
    Route::get('delete/conference/link','API\VideoConferenceController@deletelink')->name('deletelink');
    Route::post('ZoomToken','API\VideoConferenceController@generate_signature')->name('generate_signature');
});

//Video like, comment, & share

Route::post('videoLike','API\VideosController@videoLike');
Route::post('videoComment','API\VideosController@videoComment');
Route::post('videoSharing','API\VideosController@VideoSharing');
Route::post('videoDownload','API\VideosController@VideoDownload');
Route::delete('deleteComments','API\VideosController@DeleteComments');
Route::post('editComments','API\VideosController@EditComments');
Route::get('GetVideoComments','API\VideosController@Comments');
//weekly scedule apis
Route::post('SendSchedule','API\WeeklyScheduleApi@makeweekly');
Route::post('GetSchedule','API\WeeklyScheduleApi@getweekly');
Route::get('SyncEmail','emailsyncController@index');
//block users
Route::get('blockusers','HomeController@blockuser');
//zoomtokens
Route::get('zoomtoken','ZoomAPIsController@GetZoomRecordings');
//coupon
Route::post('getusercoupon','API\CouponController@GetUserCoupon');
Route::get('getusercouponimages','API\CouponController@getcouponimages');
Route::post('changebg','API\CouponController@changebg');

//Formularios
Route::post('Solicitarinformacion','API\StudentController@formularioapi');
//resetallactivities
Route::post('resetallactivites','API\ProgramController@resetallprograms');
//sendnew emails to sendinblue for email marketing
Route::get('sendemails','SendEmailMarketingController@index');

//
Route::get('rejectionoptions','API\ExamController@RejectionOption');
//deleteuser
Route::post('deleteuser','API\StudentController@deleteuser');
Route::post('ChangePushNotificationStatus','API\StudentController@allownotification');


//Vimeo

Route::get('VimeoTutorial','API\VimeoController@tutorial');
Route::get('VimeoUploadVideo','API\VimeoController@UploadVideo');
Route::get('VimeoGetAllFolder','API\VimeoController@GetAllFolder');
Route::get('VimeoUploadClassesVideo','API\VimeoController@UploadAllVideo');


