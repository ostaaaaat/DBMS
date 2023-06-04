drop schema public cascade;
create schema public;

create table sub_categories
(	
	"id" serial not null primary key,
    "name" varchar(100) not null
);

create table materials
(	
	"id" serial not null primary key,
    "name" varchar(100) not null
);

create table brands
(	
	"id" serial not null primary key,
    "name" varchar(100) not null
);

create table discounts
(	
	"id" serial not null primary key,
    "size" float not null,
	start_date date,
    end_date date
);

create table categories
(	
	"id" serial not null primary key,
    "name" varchar(100) not null
);

create table animals
(	
	"id" serial not null primary key,
    "name" varchar(50) not null
);

create table products
(
	"id" serial not null primary key,
	"name" varchar(100) not null,
	photo varchar(500) not null,
	description varchar(400),
	animal_id int not null,
    category_id int not null,
    price float not null,
    discount_id int not null,
	weight float,
    brand_id int not null,
	material_id int,
	sub_category_id int not null,
    
	foreign key (animal_id)
		references animals ("id"),
	foreign key (category_id)
		references categories ("id"),
	foreign key (discount_id)
		references discounts ("id"),
	foreign key (brand_id)
		references brands ("id"),
	foreign key (material_id)
		references materials ("id"),
	foreign key (sub_category_id)
		references sub_categories ("id")
);

insert into sub_categories ("name")
values
('Взрослые'),
('Консервы'),
('Мячи'),
('Дразнилки'),
('Тоннели'),
('Расчески'),
('Шампуни'),
('Автокормушки'),
('Древесный наполнитель'),
('Вяленое мясо');

insert into materials ("name")
values
('Пластик'),
('Керамика'),
('Дерево'),
('Резина'),
('Джут'),
('Мех'),
('Металл'),
('Полиэстер'),
('Велюр'),
('Стекло');

insert into brands ("name")
values
('Molina'),
('Papillon'),
('Royal Canin'),
('Smart Dog'),
('Triol'),
('Anju Beaute'),
('Bonsy'),
('Trixie'),
('Catit'),
('N1');

insert into discounts ("size", start_date, end_date)
values
(0.2, '01.01.2020', '31.12.2021'),
(0.5, '01.03.2021', '10.03.2021'),
(0.1, '22.02.2021', '24.02.2021'),
(0.1, '01.01.2022', '01.02.2022'),
(0.7, '11.07.2020', '31.12.2020'),
(0.3, '21.03.2021', '10.04.2021'),
(0.2, '30.06.2017', '24.07.2017'),
(0.2, '08.12.2021', '10.12.2021'),
(0.6, '10.10.2019', '15.10.2019'),
(0.8, '15.02.2018', '15.03.2018');

insert into categories ("name")
values
('Лакомства для собак'),
('Сухой корм'),
('Игрушки'),
('Груминг'),
('Миски'),
('Наполнители'),
('Ветеринарная аптека'),
('Гигиена'),
('Когтеточки'),
('Ошейники');

insert into animals ("name")
values
('Кошка'),
('Собака'),
('Хорек'),
('Рыбка'),
('Черепашка'),
('Хомяк'),
('Крыска'),
('Попугай'),
('Другие грызуны'),
('Экзотические животные');

insert into products ("name", photo, description, animal_id, category_id, price, 
					  discount_id, weight, brand_id, material_id, sub_category_id)
values
('Корм Royal Canin для кастрированных кошек и котов: 1-7 лет',
 'https://6kcmxu3d7l.a.trbcdn.net/upload/files-new/4f/68/b7/312598_400x400.jpg', 
 'После стерилизации необходимо пересмотреть рацион кошки с учетом изменившихся потребностей в энергии. ROYAL CANIN® Sterilised 37 помогает снизить риск появления избыточного веса, благодаря умеренному содержанию жиров, при соблюдении рекомендуемых норм кормления.', 
 1, 2, 7946, 7, 10, 3, null, 1),
('Papillon валик мататаби/из лозы с шариком кошачьей мяты внутри',
 'https://6kcmxu3d7l.a.trbcdn.net/upload/files-new/2b/7d/8b/567890_400x400.jpg', 
 'Экологичная деревянная игрушка, высотой 4,9 см, с шариком кошачьей маты, не оставит равнодушной вашу кошку. Шарик внутри перемещается.', 
 1, 3, 361, 3, 0.1, 2, 3, 3),
('Anju Beaute шампунь для котят: пассифлора и ваниль',
 'https://6kcmxu3d7l.a.trbcdn.net/upload/files-new/a5/33/14/418198_400x400.jpg', 
 'Шампунь Douceur Extreme Shampooing  оригинального французского качества разработан специально для самых маленьких питомцев. Он восстанавливает и сохраняет кожный баланс и рассчитан на любой тип шерсти.', 
 1, 4, 1128, 1, null, 6, null, 7),
('Papillon расческа для вычесывания, 63 вращающихся зубца, 21 см',
 'https://6kcmxu3d7l.a.trbcdn.net/upload/files-new/5e/85/df/23902_400x400.jpg', 
 'Papillon позаботился о привлекательности ваших питомцев и создал целую серию ярких и качественных товаров для груминга. Двухсторонние щетки-пуходерки разных размеров, когтерезы-кусачки, наборы и расчески для вычесывания не оставят вас равнодушными и без труда справятся с поставленными задачами. Они изготовлены из натуральных материалов и не представляют угрозы для здоровья вашего питомца.', 
 1, 4, 691, 5, 0.1, 2, 7, 6),
('Catit Senses 2.0 Поилка-фонтан "Цветок"',
 'https://6kcmxu3d7l.a.trbcdn.net/upload/files-new/40/be/f6/549616_400x400.jpg', 
 'Питьевой фонтанчик Catit Senses 2.0 предназначен для постоянного обеспечения кошки свежей питьевой водой. Побуждение вашего животного пить больше воды поможет предотвратить возникновение избыточных концентраций солей в моче и как следствие возникновение мочекаменной болезни.', 
 1, 5, 4409, 1, 0.82, 6, null, 7),
('Trixie тоннель для кошки, шуршащий',
 'https://6kcmxu3d7l.a.trbcdn.net/upload/files-new/1a/13/5f/401611_400x400.jpg', 
 'Кошки обожают укромные места - а тоннели для кошек отличный вариант. Тоннели изготовлены из различных материалов, могут быть шуршащими или мягкими плюшевыми, с двумя или несколькими выходами. Для каждой кошки обязательно найдется игровой туннель.', 
 1, 3, 1120, 2, null, 5, 8, 5),
('Triol Marvel удочка-дразнилка "Marvel" Ракета',
 'https://6kcmxu3d7l.a.trbcdn.net/upload/files-new/95/02/13/507870_400x400.jpg', 
 'Удочка-дразнилка в дизайне Ракета приведет в восторг и кошку, и ее хозяина. «Кошачья мята», которая находится в игрушке, снимает напряжение и устраняет последствия перенесенных стрессовых ситуаций и быстро улучшает настроение питомца. Кошка не сможет пройти мимо такого удовольствия и непременно решит позабавиться с дразнилкой.', 
 1, 3, 486, 4, 0.08, 8, 9, 4),
('N1 комкующийся древесный (гималайский кедр) наполнитель "Зеленый чай"',
 'https://6kcmxu3d7l.a.trbcdn.net/upload/files-new/0f/ca/e1/581636_400x400.jpg', 
 'Первый комкующийся наполнитель, созданный на основе инновационной австралийской технологии. Добавление листьев зелёного чая позволяет оптимально нейтрализовывать запахи, создавая комфортные условия как владельцу, так и питомцу.', 
 1, 6, 2587, 2, 7, 10, null, 9),
('Smart Dog лакомства говяжье лёгкое',
 'https://6kcmxu3d7l.a.trbcdn.net/upload/files-new/c8/6e/40/603583_400x400.jpg', 
 'Достижения и прилежное поведение нужно поощрять, лакомства Smart Dog станут отличной наградой и поднимут настроение вашему хвостику. Это ароматное и легкоусвояемое лакомство для собак богато витаминами и микроэлементами, которые оказывают положительное влияние на состояние кожи и шерсти собаки.', 
 2, 1, 162, 8, 0.05, 4, null, 10),
('Papillon игрушка для собак "Неоновый мяч", резина/губка, 6 см',
 'https://6kcmxu3d7l.a.trbcdn.net/upload/files-new/ea/1b/bc/23941_400x400.jpg', 
 null, 
 2, 3, 220, 10, 0.093, 2, 4, 3);

