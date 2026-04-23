// Notification Manager - Works on both web and Android APK
import { LocalNotifications } from "@capacitor/local-notifications";

export class NotificationManager {
  private isCordova = (window as any).cordova !== undefined;
  private isCapacitor = (window as any).Capacitor !== undefined;
  private notificationId = 1000;

  // Get Cordova notification plugin
  private getCordovaNotification() {
    return (window as any).cordova?.plugins?.notification?.local;
  }

  async initialize(): Promise<void> {
    console.log("Initializing NotificationManager...");
    console.log("Is Cordova:", this.isCordova);
    console.log("Is Capacitor:", this.isCapacitor);
    console.log("window.cordova:", (window as any).cordova);

    if (this.isCordova) {
      try {
        // For Cordova, request permissions
        const notification = this.getCordovaNotification();
        if (notification && notification.requestPermission) {
          notification.requestPermission();
          console.log("Cordova notification permission requested");
        }
      } catch (error) {
        console.log("Cordova initialization error:", error);
      }
    } else if (this.isCapacitor) {
      try {
        const result = await LocalNotifications.requestPermissions();
        console.log("Capacitor permission result:", result);
      } catch (error) {
        console.log("Capacitor permission error:", error);
      }
    }
  }

  async showNotification(
    title: string,
    body: string,
    id: number = this.notificationId++,
  ): Promise<void> {
    try {
      if (this.isCordova) {
        // Use Cordova Local Notifications plugin
        const notification = this.getCordovaNotification();
        if (notification) {
          console.log("Showing Cordova notification:", title);
          notification.schedule({
            id: id,
            title: title,
            text: body,
            foreground: true,
            smallIcon: "ic_launcher", // Use the app icon
          });
        } else {
          console.warn("Cordova notification plugin not available");
        }
      } else if (this.isCapacitor) {
        // Use Capacitor Local Notifications for iOS
        console.log("Showing Capacitor notification:", title);
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

  async scheduleNotification(
    id: number,
    title: string,
    body: string,
    when: Date,
  ): Promise<void> {
    try {
      if (this.isCordova) {
        const notification = this.getCordovaNotification();
        if (notification) {
          notification.schedule({
            id,
            title,
            text: body,
            foreground: true,
            trigger: { at: when },
            at: when,
            smallIcon: "ic_launcher",
          });
        }
      } else if (this.isCapacitor) {
        await LocalNotifications.schedule({
          notifications: [
            {
              id,
              title,
              body,
              schedule: { at: when },
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      if (this.isCordova) {
        console.log("Requesting Cordova notification permissions...");
        const notification = this.getCordovaNotification();
        if (notification && notification.requestPermission) {
          notification.requestPermission();
          return true;
        }
        return true; // Assume granted for Cordova
      } else if (this.isCapacitor) {
        console.log("Requesting Capacitor notification permissions...");
        const result = await LocalNotifications.requestPermissions();
        console.log("Capacitor permission result:", result);
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
      if (this.isCordova) {
        // Cordova plugin typically has permissions by default
        return true;
      } else if (this.isCapacitor) {
        const result = await LocalNotifications.checkPermissions();
        console.log("Capacitor permission check:", result);
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
      if (this.isCordova) {
        const notification = this.getCordovaNotification();
        if (notification && notification.cancel) {
          notification.cancel(id);
        }
      } else if (this.isCapacitor) {
        await LocalNotifications.cancel({ notifications: [{ id }] });
      }
    } catch (error) {
      console.log("Error cancelling notification:", error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      if (this.isCordova) {
        const notification = this.getCordovaNotification();
        if (notification && notification.cancelAll) {
          notification.cancelAll();
        }
      } else if (this.isCapacitor) {
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
