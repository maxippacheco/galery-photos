import { useState } from "react";
import { searchApi } from "../api/search-images";

export const usePhotos = () => {
	
	const [photos, setPhotos] = useState([]);

	const getPhotos = async(formQuery = 'office') => {
		const resp = await searchApi.get(`/search/photos?client_id=${ your_client_ID }&page=1&query=${ formQuery }`);

		setPhotos(resp.data);
	}
	
	return{
		photos,
		setPhotos,
		getPhotos
	}
}
