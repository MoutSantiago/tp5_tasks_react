import axios from "axios";
import { toast } from "sonner";

type ApiError = {
	error: string;
	message?: string;
	details?: unknown;
};

console.log(import.meta.env.VITE_API_URL);

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => response,

	(error: unknown) => {
		if (!axios.isAxiosError<ApiError>(error)) {
			toast.error("Ocurrió un error inesperado");
			return Promise.reject(error);
		}

		// El servidor respondió con un código de error
		if (error.response) {
			const status = error.response.status;
			const data = error.response.data;

			// Si el backend envió un mensaje, usarlo
			if (data?.message) {
				toast.error(data.message);
			} else {
				// Mensajes genéricos según HTTP status
				switch (status) {
					case 400:
						toast.error("La solicitud no es válida");
						break;

					case 404:
						toast.error("No se encontró el recurso solicitado");
						break;

					case 500:
						toast.error("Ocurrió un error en el servidor");
						break;

					case 502:
					case 503:
					case 504:
						toast.error("El servidor no está disponible");
						break;

					default:
						toast.error("Ocurrió un error inesperado");
				}
			}
		}
		// La petición se realizó pero no hubo respuesta
		else if (error.request) {
			toast.error("No se pudo conectar con el servidor");
		}
		// Error al configurar la petición
		else {
			toast.error("Ocurrió un error inesperado");
		}

		return Promise.reject(error);
	},
);
