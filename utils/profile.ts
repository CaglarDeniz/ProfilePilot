import options from './cli'

export type UserProfile  = {
	name : string,
	first_name : string,
	last_name : string,
	email : string,
	username : string,
	password : string,
	gender : 'male' | 'female',
	country : string
}

export const currentProfile : UserProfile = {
	name : options.victim_name || 'John Doe',
	first_name : options.victim_first_name || 'John',
	last_name : options.victim_last_name || 'Doe',
	email : options.victim_email || 'johndoe@gmail.com',
	username : options.victim_username || 'johndoe',
	password : options.victim_password || 'johndoe1234',
	gender : options.victim_gender || 'male',
	country : options.victim_country || 'United States'
}
