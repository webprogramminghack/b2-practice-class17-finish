type Notification<TypeName extends string, Payload> = {
  type: TypeName; // Represents the type of notification (e.g., 'email', 'sms')
  payload: Payload; // Represents the data required for the notification
};

type EmailNotification = {
  recipientEmail: string;
  subject: string;
  body: string;
};

type SMSNotification = {
  recipientPhoneNumber: string;
  message: string;
};

type PushNotification = {
  deviceId: string;
  title: string;
  content: string;
};

type EmailNotificationType = Notification<'email', EmailNotification>;
type SMSNotificationType = Notification<'sms', SMSNotification>;
type PushNotificationType = Notification<'push', PushNotification>;

// Conditional type to extract the notification type name
type NotificationTypeName<N extends Notification<string, any>> =
  N extends Notification<infer TypeName, unknown> ? TypeName : never;

// Using the utility type to extract notification type names
type EmailType = NotificationTypeName<EmailNotificationType>; // 'email'
type SMSType = NotificationTypeName<SMSNotificationType>; // 'sms'
type PushType = NotificationTypeName<PushNotificationType>; // 'push'

// Conditional type to extract the notification payload
type NotificationTypePayload<N extends Notification<string, any>> =
  N extends Notification<any, infer Payload> ? Payload : never;

type EmailPayload = NotificationTypePayload<EmailNotificationType>;

// simple example
type Device = {
  deviceId: string;
  deviceName: string;
  content: string;
};

type GenericType<T> = {
  deviceId: T;
};

type DeviceId<T extends GenericType<any>> = T extends GenericType<infer U>
  ? U
  : never;

type DeviceIdType = DeviceId<Device>; // string

// another simple example
type InferSomething<T> = T extends infer U ? U : never;
type Inferred = InferSomething<'Hello'>; // 'Hello'

// another simple example
type ObjectType<K extends keyof any, V> = {
  [P in K]: V;
};

type ObjectIsh = {
  [K in any]: any;
};

type InferSomething2<T extends ObjectType<string, ObjectIsh>> =
  T extends ObjectType<string, infer V> ? V : never;

type Inferred2 = InferSomething2<{
  person: { name: string; age: number };
  occupation: { job: string; salary: number };
}>; // { name: string; age: number } | { job: string; salary: number }
// the reason it becomes union is because infer V has 2 possible values

// The intersection only occurs when we use the union types as parameters of a function type
// So instead of producing union types, it produces intersection types
type UnionToIntersection<T> = (T extends any ? (x: T) => void : never) extends (
  x: infer R
) => void
  ? R
  : never;

type Inferred3 = UnionToIntersection<Inferred2>;

// however, the union should be produced by the internal code of the conditional type
type UnionFunction =
  | ((x: { name: string }) => void)
  | ((x: { age: number }) => void);

type WrongUnionToIntersection<T> = T extends (x: infer R) => void ? R : never;

type Inferred4 = WrongUnionToIntersection<UnionFunction>;

// the correct way
type UnionObjects = { name: string } | { age: number };

type CorrectUnionToIntersection<T extends { [K in any]: any }> = (
  T extends any ? (x: T) => void : never
) extends (x: infer O) => void
  ? O
  : never;

type Inferred5 = CorrectUnionToIntersection<UnionObjects>;
// {
//   name: string;
//   age: number;
// };

// wrong approach (without function)
type UnionObjects2 = { name: string } | { age: number };

// if it's not a function, it will not produce an intersection type, so if you want to transform union types into intersection types, you need to use a function
type ExampleUnionToIntersection<T> = (T extends any ? T : never) extends infer U
  ? U
  : never;

type Inferred6 = ExampleUnionToIntersection<UnionObjects2>;

// so the rules as follows:
// 1. The intersection only occurs when we use the union types as parameters of a function type
// 2. The union should be produced by the internal code of the conditional type
