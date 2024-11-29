package com.mindi

import android.content.Context
import android.os.PowerManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class KeepAwakeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var wakeLock: PowerManager.WakeLock? = null

    override fun getName(): String {
        return "KeepAwake"
    }

    @ReactMethod
    fun activate() {
        val powerManager = reactApplicationContext.getSystemService(Context.POWER_SERVICE) as PowerManager
        wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "KeepAwake::WakeLock")
        wakeLock?.acquire()
    }

    @ReactMethod
    fun deactivate() {
        wakeLock?.release()
        wakeLock = null
    }
}
