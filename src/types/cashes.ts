export type TCashes = {
	amount: number;
	detail: string;
	contact: string;
	created_at: string;
	updated_at: string;
};

export type TResponse = {
	cashes: TCashes[];
	total: number;
};

export type TCashesDetail = {
	uuid: string;
	amount: number;
	detail: string;
	note: string;
	client: string;
	contact: string;
	created_at: string;
};
