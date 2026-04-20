// Notification Manager - Works on both web and Android APK
import { LocalNotifications } from "@capacitor/local-notifications";

export class NotificationManager {
  private isNative =
    (window as any).cordova !== undefined ||
    (window as any).Capacitor !== undefined;
  private notificationId = 1000;

  async initialize(): Promise<void> {
    console.log("Initializing NotificationManager...");
    console.log("Is Native/Cordova:", this.isNative);
    console.log("window.cordova:", (window as any).cordova);
    console.log("window.Capacitor:", (window as any).Capacitor);

    if (this.isNative) {
      try {
        // Request notification permissions on Android
        const result = await LocalNotifications.requestPermissions();
        console.log("Notification permission result:", result);
      } catch (error) {
        console.log("Notification permission request failed:", error);
      }
    }
  }

  async showNotification(
    title: string,
    body: string,
    id: number = this.notificationId++,
  ): Promise<void> {
    try {
      if (this.isNative) {
        // Use Capacitor Local Notifications for Android/iOS APK
        console.log("Showing native notification:", title);
        await LocalNotifications.schedule({
          notifications: [
            {
              title,
              body,
              id,
            },
          ],
        });
      } else if (
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        // Fall back to browser Notification API for web
        console.log("Showing web notification:", title);
        new Notification(title, {
          body,
          tag: `notification-${id}`,
        });
      }
    } catch (error) {
      console.error("Error showing notification:", error);
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      if (this.isNative) {
        console.log("Requesting native notification permissions...");
        const result = await LocalNotifications.requestPermissions();
        console.log("Native permission result:", result);
        return result.display === "granted" || result.display === "prompt";
      } else if ("Notification" in window) {
        console.log("Requesting web notification permissions...");
        const permission = await Notification.requestPermission();
        console.log("Web permission result:", permission);
        return permission === "granted";
      }
      return false;
    } catch (error) {
      console.error("Error requesting permissions:", error);
      return false;
    }
  }

  async checkPermissions(): Promise<boolean> {
    try {
      if (this.isNative) {
        const result = await LocalNotifications.checkPermissions();
        console.log("Native permission check:", result);
        return result.display === "granted";
      } else if ("Notification" in window) {
        const permission = Notification.permission === "granted";
        console.log("Web permission check:", permission);
        return permission;
      }
      return false;
    } catch (error) {
      console.log("Error checking permissions:", error);
      return false;
    }
  }

  async cancelNotification(id: number): Promise<void> {
    try {
      if (this.isNative) {
        await LocalNotifications.cancel({ notifications: [{ id }] });
      }
    } catch (error) {
      console.log("Error cancelling notification:", error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      if (this.isNative) {
        // Cancel by getting all pending notifications
        const pending = await LocalNotifications.getPending();
        if (pending.notifications.length > 0) {
          await LocalNotifications.cancel({
            notifications: pending.notifications,
          });
        }
      }
    } catch (error) {
      console.log("Error cancelling all notifications:", error);
    }
  }
}

export const notificationManager = new NotificationManager();
