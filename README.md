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
