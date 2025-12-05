import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'order' | 'user' | 'stock' | 'payment' | 'general';
  time: string;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: Notification[] = [];

  notifications$ = new BehaviorSubject<Notification[]>([]);

  constructor() {
    this.loadNotifications();
  }

  /* ======================================================
      LOAD NOTIFICATIONS FROM LOCAL STORAGE
  ====================================================== */
  private loadNotifications() {
    const data = localStorage.getItem('notifications');
    this.notifications = data ? JSON.parse(data) : [];
    this.notifications$.next(this.notifications);
  }

  /* ======================================================
      SAVE TO LOCAL STORAGE
  ====================================================== */
  private save() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
    this.notifications$.next(this.notifications);
  }

  /* ======================================================
      ADD NEW NOTIFICATION
  ====================================================== */
push(type: "order" | "user" | "stock" | "payment" | "general", message: string) {
  const newNote: Notification = {
    id: Date.now(),
    type,
    message,
    time: new Date().toLocaleString(),
    read: false
  };

  this.notifications.push(newNote);
  this.save();
}


  /* ======================================================
      MARK ONE AS READ
  ====================================================== */
  markAsRead(id: number) {
    const noti = this.notifications.find(n => n.id === id);
    if (noti) {
      noti.read = true;
      this.save();
    }
  }

  /* ======================================================
      MARK ALL AS READ
  ====================================================== */
  markAllAsRead() {
    this.notifications = this.notifications.map(n => ({
      ...n,
      read: true
    }));
    this.save();
  }

  /* ======================================================
      CLEAR ALL NOTIFICATIONS
  ====================================================== */
clearAll() {
  this.notifications = [];
  localStorage.removeItem("notifications");
  this.notifications$.next(this.notifications);
}


}
