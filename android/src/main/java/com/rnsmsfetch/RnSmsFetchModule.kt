package com.rnsmsfetch

import android.provider.Telephony
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.bridge.Promise
import org.json.JSONObject
import java.lang.Exception

@ReactModule(name = RnSmsFetchModule.NAME)
class RnSmsFetchModule(reactContext: ReactApplicationContext) :
  NativeRnSmsFetchSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  override fun readSms(filterJson: String?, promise: Promise): Unit {
    try{
      val contentResolver = reactApplicationContext.contentResolver

      val getVal = contentResolver.query(
Telephony.Sms.Inbox.CONTENT_URI,
null,
null,
null,
Telephony.Sms.DEFAULT_SORT_ORDER
      )

      val msgs =WritableNativeArray()

if(getVal != null && getVal.moveToFirst()){
do{
val msg = WritableNativeMap()
msg.putString("_id",getVal.getString(getVal.getColumnIndexOrThrow(Telephony.Sms._ID)))
msg.putString("address",getVal.getString(getVal.getColumnIndexOrThrow(Telephony.Sms.ADDRESS)))
msg.putString("body",getVal.getString(getVal.getColumnIndexOrThrow(Telephony.Sms.BODY)))
  val dateIndex = getVal.getColumnIndexOrThrow(Telephony.Sms.DATE)
val dateLong = try {
  getVal.getLong(dateIndex)
} catch (e: Exception) {
  val dateStr = getVal.getString(dateIndex)
  dateStr?.toDoubleOrNull()?.toLong() ?: 0L
}
msg.putDouble("date", dateLong.toDouble())

msgs.pushMap(msg)

}while (getVal.moveToNext())

getVal.close()
}
promise.resolve(msgs)

    }catch(e: Exception){
promise.reject("ERR_SMS_READ","Could not read sms:",e)
    }
  }

  companion object {
    const val NAME = "RnSmsFetch"
  }
}
