import { View } from 'react-native';
import Home from './components/Home';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SafeAreaView } from 'react-native-safe-area-context';

const App: React.FC = () => {
    return <View style={{ flex: 1 }}>
        <Provider store={store}>
            <SafeAreaView style={{ flex: 1 }}>
                <Home />
            </SafeAreaView>
        </Provider>
    </View>;
};

export default App;