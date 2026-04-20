// Notification Manager - Works on both web and Android APK
import { LocalNotifications } from "@capacitor/local-notifications";

export class NotificationManager {
  private isNative = (window as any).cordova !== undefined;
  private isCapacitor = (window as any).Capacitor !== undefined;
  private notificationId = 1000;

  async initialize(): Promise<void> {
    if (this.isNative || this.isCapacitor) {
      try {
        // Request notification permissions on Android
        const result = await LocalNotifications.requestPermissions();
        console.log("Notification permission status:", result);
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
      if (this.isNative || this.isCapacitor) {
        // Use Capacitor Local Notifications for Android/iOS APK
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
      if (this.isNative || this.isCapacitor) {
        const result = await LocalNotifications.requestPermissions();
        return result.display === "granted" || result.display === "prompt";
      } else if ("Notification" in window) {
        const permission = await Notification.requestPermission();
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
      if (this.isNative || this.isCapacitor) {
        const result = await LocalNotifications.checkPermissions();
        return result.display === "granted";
      } else if ("Notification" in window) {
        return Notification.permission === "granted";
      }
      return false;
    } catch (error) {
      console.log("Error checking permissions:", error);
      return false;
    }
  }

  async cancelNotification(id: number): Promise<void> {
    try {
      if (this.isNative || this.isCapacitor) {
        await LocalNotifications.cancel({ notifications: [{ id }] });
      }
    } catch (error) {
      console.log("Error cancelling notification:", error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      if (this.isNative || this.isCapacitor) {
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
