import dayjs from "dayjs";
import { ref } from "vue";

interface ILog {
  name: string;
  date: string;
  message: string;
}

const logs = ref<ILog[]>([]);

/**
 * 观察者
 * 观察者有一个方法,
 * 1. 更新信息 update(message)
 * @class Observer
 * @description 一个简单的观察者
 *  */
class Observer {
  constructor(public name: string) {}
  /**
   * 给观察者发送消息
   * @param message {string}
   * @returns {void}
   */
  update(message: string): void {
    logs.value.push({
      name: this.name,
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      message: message,
    });
  }
}

/**
 * 订阅者
 * 订阅者有三个方法
 * 1. 订阅 attach(observer: Observer)
 * 2. 取消订阅 detach(observer: Observer)
 * 3. 通知观察者消息 notify(message: string)
 *
 * @class Subject
 * @description 一个简单的被观察者
 */
class Subject {
  private observers: Set<Observer> = new Set();
  constructor() {}
  /**
   * 添加观察者
   * @param observer {Observer}
   * @returns {void}
   */
  attach(observer: Observer): void {
    this.observers.add(observer);
  }
  /**
   * 移除观察者
   * @param observer {Observer}
   * @returns {void}
   */
  detach(observer: Observer): void {
    this.observers.delete(observer);
  }
  /**
   * 通知观察者消息
   * @param message {string}
   */
  notify(message: string): void {
    this.observers.forEach((observer) => observer.update(message));
  }
}

export { Observer, Subject, logs };
