--отображение всех товаров с типом животного "кошка"
select products.name, photo, description, price, weight, animals.name, categories.name, sub_categories.name, discounts.size, discounts.start_date, discounts.end_date,brands.name, materials.name from products 
left JOIN categories ON products.category_id=categories.id
left JOIN discounts ON products.discount_id=discounts.id
left JOIN animals ON products.animal_id=animals.id
left JOIN brands ON products.brand_id=brands.id
left JOIN materials ON products.material_id=materials.id
left JOIN sub_categories ON products.sub_category_id=sub_categories.id
WHERE animals.name LIKE '%Кошка%';

--отображение всех товаров по категории "груминг"
select products.name, photo, description, price, weight, animals.name, categories.name, sub_categories.name, discounts.size, discounts.start_date, discounts.end_date,brands.name, materials.name from products 
left JOIN categories ON products.category_id=categories.id
left JOIN discounts ON products.discount_id=discounts.id
left JOIN animals ON products.animal_id=animals.id
left JOIN brands ON products.brand_id=brands.id
left JOIN materials ON products.material_id=materials.id
left JOIN sub_categories ON products.sub_category_id=sub_categories.id
WHERE categories.name LIKE '%Груминг%';

--отображение всех товаров по поиску 
select products.name, photo, description, price, weight, animals.name, categories.name, sub_categories.name, discounts.size, discounts.start_date, discounts.end_date,brands.name, materials.name from products 
left JOIN categories ON products.category_id=categories.id
left JOIN discounts ON products.discount_id=discounts.id
left JOIN animals ON products.animal_id=animals.id
left JOIN brands ON products.brand_id=brands.id
left JOIN materials ON products.material_id=materials.id
left JOIN sub_categories ON products.sub_category_id=sub_categories.id
WHERE products.name LIKE '%ко%';

--удалить товар по названию
DELETE FROM products WHERE "name" like '%котов%';

--изменить стоимость товара
UPDATE products SET price=450 WHERE "id"=2;

--посчитать стоимость товара со скидкой
select products.name, price, discounts.size, discounts.start_date, discounts.end_date, SUM(price*(1-discounts.size)) AS itog_price from products 
left JOIN discounts ON products.discount_id=discounts.id
GROUP BY products.name, price, discounts.size, discounts.start_date, discounts.end_date;
