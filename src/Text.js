class TextKey {
  // App
  TurnOnVPN = "Turn_On_VPN";
  Ok = "Ok";

  // Not Found
  NF_Page_Title = "NotFound_Page_Title";
  NF_Title = "NotFound_Title";

  // Navbar
  NB_Main_Title = "NB_Main_Title";
  NB_MenuResponsive = "NB_Menu_Responsive";
  NB_MenuNewPost = "NB_Menu_New_Post";
  NB_MenuBlogs = "NB_Menu_Blogs";
  NB_AboutMe = "NB_Menu_About_Me";
  NB_SignInGmail = "NB_Menu_Sign_In_Gmail";

  // Home
  HL_Title = "Home_Landing_Title";
  HL_Option_1 = "Home_Landing_Option_1";
  HL_Option_2 = "Home_Landing_Option_2";
  HL_Option_3 = "Home_Landing_Option_3";
  HL_Btn_SeeAllPost = "Home_Landing_Button_See_All_Post";
  HL_Btn_NewPost = "Home_Landing_Button_New_Post";
  HL_Title_LastBlog = "Home_Landing_Title_Last_Blog";
  HL_EMPTY_LIST = "Home_Landing_EMPTY_LIST";
  H_Page_Title = "H_Page_Title";

  // Post
  HL_Btn_Continue = "Home_Landing_Btn_Continue";
  HL_Authour_Title = "Home_Landing_Authour_Title";

  // Blog
  B_Page_Title = "B_Page_Title";

  // NewPost
  NP_PH_Title = "NewPost_PH_Title";
  NP_PH_Summary = "NewPost_PH_Summary";
  NP_PH_Body = "NewPost_PH_Body";
  NP_PH_Text = "NewPost_PH_Text";
  NP_Btn_Login = "NewPost_Btn_Login";
  NP_Btn_Post = "NewPost_Btn_Post";
  NP_IN_File = "NewPost_Input_File";
  NP_SuccessPost = "NP_Success_Post";
  NP_ErrorAuth = "NP_Error_Auth";
  NP_ErrorPost = "NP_Error_Post";
  NP_ErrorFillFields = "NP_Error_Fill_Fields";
  NP_ErrorImageSize = "NP_Error_Image_Size";
  NP_MaximumPicSize = "NP_Maximum_Picture_Size";
  NP_Page_Title = "NP_Page_Title";

  // About Me
  AM_NAME = "AM_MY_NAME";
  AM_SPECIALTY = "AM_SPECIALTY_FRONT_END";
  AM_SEE_MY_WEB = "AM_SEE_MY_PORTFOLIO";
  AM_Page_Title = "AM_PAGE_TITLE";

  // Other
  Mood = "Mood";
  See_More_Post = "See_More_Post";
}

const getText = (whichTextNeed, t, i18n) => {
  return t(whichTextNeed);

  // const key = new TextKey();
  // Must Have a condition to show Persian or English

  // switch (
  // whichTextNeed
  //   // App ===========
  //   case key.TurnOnVPN:
  //     return t(whichTextNeed);
  //   case key.Ok:
  //     return "ok";
  //   // =======================

  //   // Not Found =============

  //   case key.NF_Page_Title:
  //     return "آدرس اشتباهه";
  //   case key.NF_Title:
  //     return "صفحه مورد نظر پیدا نشد";

  //   // =====================

  //   // Navbar ===================
  //   case key.NB_Main_Title:
  //     return "مود بلاگ";
  //   case key.NB_MenuResponsive:
  //     return "دسترسی سریع";
  //   case key.NB_MenuNewPost:
  //     return "نوشتن پست جدید";
  //   case key.NB_MenuBlogs:
  //     return "بلاگ ها";
  //   case key.NB_AboutMe:
  //     return "درباره من";
  //   case key.NB_SignInGmail:
  //     return "ورود با Gmail";

  //   // ===================

  //   // Home Component ===================
  //   case key.HL_Title:
  //     return "هر چه میخواهد دل تنگت بگو!";
  //   case key.HL_Option_1:
  //     return "پست کردن مطالب با دسته بندی متفاوت";
  //   case key.HL_Option_2:
  //     return "امکان تایپ مطالب با ویس";
  //   case key.HL_Option_3:
  //     return "ثبت نام با جیمیل";
  //   case key.HL_Btn_SeeAllPost:
  //     return "مشاهده همه پست ها";
  //   case key.HL_Btn_NewPost:
  //     return "نوشتن پست جدید";
  //   case key.HL_Title_LastBlog:
  //     return "مطالب اخیر";
  //   case key.HL_EMPTY_LIST:
  //     return "نتیجه ای یافت نشد";
  //   case key.H_Page_Title:
  //     return "خانه";
  //   // ===================

  //   // Post Component ===================
  //   case key.HL_Btn_Continue:
  //     return "ادامه مطلب";
  //   case key.HL_Authour_Title:
  //     return "نوشته شده توسط : ";
  //   // ===================

  //   // New Post Component ===================
  //   case key.NP_PH_Title:
  //     return "عنوان پست";
  //   case key.NP_PH_Summary:
  //     return "خلاصه کوتاه از پست";
  //   case key.NP_PH_Body:
  //     return "متن پست";
  //   case key.NP_PH_Text:
  //     return `محتوای پستت رو اینجا بنویس\nاگه حوصله تایپ کردن نداری، روی دکمه ویس کلیک کن و متن رو به صورت ویس وارد کن`;
  //   case key.NP_IN_File:
  //     return "انتخاب تصویر";
  //   case key.NP_Btn_Login:
  //     return "ورود به حساب کاربری";
  //   case key.NP_Btn_Post:
  //     return "انتشار محتوا";
  //   case key.NP_SuccessPost:
  //     return "محتوای جدیدت با موفقیت منتشر شد";
  //   case key.NP_ErrorPost:
  //     return `یه مشکلی پیش اومده \n اگه میتونی با VPN تست کن`;
  //   case key.NP_ErrorAuth:
  //     return "برای انتشار محتوا، اول لاگین کن";
  //   case key.NP_ErrorFillFields:
  //     return "همه فیلدها رو پر کن";
  //   case key.NP_ErrorImageSize:
  //     return "سایز تصویر نباید بیشتر از 200 کیلوبایت باشه";
  //   case key.NP_MaximumPicSize:
  //     return "حداکثر حجم تصویر 200 کیلوبایت";
  //   case key.NP_Page_Title:
  //     return "نوشتن  پست جدید";
  //   // ===================

  //   // Blog ===================
  //   case key.B_Page_Title:
  //     return "همه پست ها";
  //   // ========================

  //   // About Me =================
  //   case key.AM_NAME:
  //     return "محمد ذوالقدر";
  //   case key.AM_SPECIALTY:
  //     return "توسعه دهنده فرانت‌‌اند | مدرس وب";
  //   case key.AM_SEE_MY_WEB:
  //     return "مشاهده وب سایت من";
  //   case key.AM_Page_Title:
  //     return "درباره من";

  //   // =====================

  //   default:
  //     break;
  //
  // ) {
  // }
};

export { TextKey, getText };
