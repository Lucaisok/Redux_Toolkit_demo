import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Router } from './Router';

const App: React.FC = () => {
    return <View style={{ flex: 1 }}>
        <Provider store={store}>
            <Router />
        </Provider>
    </View>;
};

export default App;