import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<div>Загрузка...</div>}>
					<App />
				</Suspense>
			</QueryClientProvider>
		</Provider>
	</StrictMode>
);
