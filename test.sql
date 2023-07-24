//Hiển thị toàn bộ nội dung của bảng Architect

SELECT * FROM `architect`;
//Hiển thị danh sách gồm họ tên và giới tính của kiến trúc sư
SELECT name,sex  FROM `architect`;
//Hiển thị những năm sinh có thể có của các kiến trúc sư
SELECT birthday  FROM `architect`;
//Hiển thị danh sách các kiến trúc sư (họ tên và năm sinh) (giá trị năm sinh tăng dần)
SELECT name,birthday  FROM `architect` ORDER BY birthday  ASC;
//Hiển thị danh sách các kiến trúc sư (họ tên và năm sinh) (giá trị năm sinh giảm dần)
SELECT name,birthday  FROM `architect` ORDER BY birthday  DESC;
//Hiển thị danh sách các công trình có chi phí từ thấp đến cao. Nếu 2 công trình có chi phí bằng nhau sắp xếp tên thành phố theo bảng chữ cái building
SELECT * FROM `building` ORDER BY cost ASC;
///Hiển thị tất cả thông tin của kiến trúc sư "le thanh tung";
SELECT * FROM `architect` WHERE id=1;
///Hiển thị tên, năm sinh các công nhân có chuyên môn hàn hoặc điện
SELECT * FROM `worker` WHERE skill='han' OR skill='dien';
///Hiển thị tên các công nhân có chuyên môn hàn hoặc điện và năm sinh lớn hơn 1948
SELECT * FROM `worker` WHERE (skill='han' OR skill='dien') AND birthday>'1948';
//Hiển thị những công nhân bắt đầu vào nghề khi dưới 20 (birthday + 20 > year)
SELECT * FROM `worker` WHERE (birthday + 20 )> year;
///Hiển thị những công nhân có năm sinh 1945, 1940, 1948
SELECT * FROM `worker` WHERE birthday IN (1948,1945,1940) ;
///Tìm những công trình có chi phí đầu tư từ 200 đến 500 triệu đồng
SELECT * FROM `building` WHERE cost>=200 AND cost<=500;
///Tìm kiếm những kiến trúc sư có họ là nguyen: % chuỗi
SELECT * FROM `architect` WHERE  name LIKE 'nguyen%';
///Tìm kiếm những kiến trúc sư có tên đệm là anh
SELECT * FROM `architect` WHERE  name LIKE '% anh %';
///Tìm kiếm những kiến trúc sư có tên bắt đầu th và có 3 ký tự
SELECT * FROM `architect` WHERE name LIKE '% th_';
///Tìm chủ thầu không có phone
SELECT b.id AS building_id, b.name AS building_name, b.address AS building_address,
       h.name AS host_name, h.address AS host_address,
       c.name AS contractor_name, c.phone AS contractor_phone
FROM building AS b
INNER JOIN host AS h ON b.host_id = h.id
INNER JOIN contractor AS c ON b.contractor_id = c.id;
SELECT c.*
FROM contractor AS c
LEFT JOIN building AS b ON c.id = b.contractor_id
WHERE b.contractor_id IS NULL;
/////
bai 5

//Thống kê tổng số kiến trúc sư
SELECT COUNT(*) AS total_architects
FROM architect;
//Thống kê tổng số kiến trúc sư nam
SELECT COUNT(*) AS total_boy_architects
FROM architect
WHERE sex='1';
///Tìm ngày tham gia công trình nhiều nhất của công nhân

///Tìm tổng chi phí phải trả cho việc thiết kế công trình của kiến trúc sư có Mã số 1
SELECT architect.name AS architect_name, SUM(design.benefit * 1000) AS total_salary
FROM architect 
INNER JOIN design  ON architect.id = design.architect_id
WHERE architect.id = 1;

bai 6

///Hiển thị thông tin công trình có chi phí cao nhất
SELECT*FROM `building`
WHERE cost=(SELECT MAX(cost)FROM `building`)
///Hiển thị thông tin công trình có chi phí lớn hơn tất cả các công trình được xây dựng ở Cần Thơ


bai 7
Hiển thị thù lao trung bình của từng kiến trúc sư
SELECT architect.name AS architect_name, AVG(design.benefit * 1000) AS total_salary 
FROM architect 
INNER JOIN design ON architect.id = design.architect_id 
GROUP BY architect.name;
///Hiển thị chi phí đầu tư cho các công trình ở mỗi thành phố
SELECT city, SUM(cost) AS total_cost FROM building GROUP BY city;
///Tìm các công trình có chi phí trả cho kiến trúc sư lớn hơn 50
SELECT building_id, total_benefit FROM ( SELECT building_id, SUM(benefit) AS total_benefit 
FROM design 
GROUP BY building_id ) AS subquery 
WHERE total_benefit > 50;


