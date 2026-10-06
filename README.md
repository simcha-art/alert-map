# Alert Map

האפליקציה מאפשרת ליצור התרעות חדשות, לעדכן אותן, למחוק אותן ולהציג אותן במערכת. בהצגת ההתראות יהיה ניתן לראות אותן גם כרשימת התראות וגם כנקודות על מפת ארץ ישראל על מנת לראות היכן כל התראה נמצאת.

## endpoints

| Method | Route           | תיאור                                            |
| ------ | --------------- | ------------------------------------------------ |
| GET    | /api/alerts     | מחזיר את כל ההתראות                              |
| GET    | /api/alerts/:id | מחזיר התראה אחת לפי מזהה                         |
| POST   | /api/alerts     | מוסיף התראה למסד הנתונים                         |
| DELETE | /api/alerts/:id | מוחק התראה לפי id. חברו אותו לכפתור מחיקה בלקוח. |
| PUT    | api/alerts/:id/ | עדכון התראה לפי id                               |

---

## alert format

| שדה         | סוג    | תיאור                                    |
| ----------- | ------ | ---------------------------------------- |
| displayName | string | שם או תיאור קצר של ההתראה                |
| description | string | תיאור מפורט של ההתראה (חובה)             |
| priority    | string | רשימה נפתחת: Low, Medium, High, Critical |
| arena       | string | רשימה נפתחת: North, South, Center        |
| status      | string | רשימה נפתחת: Active, Handled             |
| lon         | number | קו אורך (longitude) להצגה במפה           |
| lat         | number | קו רוחב (latitude) להצגה במפה            |

---


## DB

השתמשתי בדאטאבייס לא רצליוני מסוג MONGODB, מאחר ויש כאן רק טבלה אחת של התראות, כך שאין צורך בקשרים בין טבלאות שונות, ולכן אין יתרון לדאטאבייס רלציוני.

## HTTP Statuses
422 => for id which cannot be changed to ObjectId => unprocessable
400 => in create and update alerts, if the feild should not be in the alert, or if the type isn't fit the required type.
404 => for updating, deleting or getting alert that doesn't exist
401 => when the user has no token, he is unauthenticated
403 => when the user has token, but he has no permission to do the operation
500 => internal server error, which is not the user's fault
