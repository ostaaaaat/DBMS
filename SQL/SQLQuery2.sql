select password from users 
	where email = 'pops@mail.ru'
Go

insert Users (email, password, name, delivery_id, animal_id, phone) 
	values ('derby@mail.ru', 'fji43k', 'Âèòÿ', 16, 5, '89374567810')
Go

select count(*) count_deliveries 
	from Deliveries
	where user_id = 6
Go


select count(*) count_animals
	from users_to_animals
	where user_id = 6
Go

