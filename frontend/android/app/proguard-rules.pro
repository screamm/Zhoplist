# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Preserve line number information for debugging stack traces
-keepattributes SourceFile,LineNumberTable

# Keep source file name for better crash reports
-keepattributes SourceFile

# Capacitor specific rules
-keep class com.getcapacitor.** { *; }
-keep class com.zhoplist.app.** { *; }

# Keep JavaScript interface methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# AdMob rules
-keep class com.google.android.gms.ads.** { *; }
-keep class com.google.ads.** { *; }

# WebView rules for Capacitor
-keepclassmembers class * extends android.webkit.WebViewClient {
    public void *(android.webkit.WebView, java.lang.String);
}