import { Component } from 'react';
import {
	Text,
	View,
	TextInput
} from 'react-native';
import LocationWatcher from '../utils/Location';
import ClearButton from '../components/ClearButton';

interface Props { }

interface State {
	coords: { latitude: number, longitude: number };
	error?: Error;
}

export default class AddLocation extends Component<Props, State>{
	private mLocationName: string;
	private mLocationType: string;
	private mLocationWatcher: LocationWatcher;

	public constructor(props: Props) {
		super(props);
		this.mLocationWatcher = new LocationWatcher(
			({ coords }) => this.setState({ coords }),
			(error) => this.setState({ error })
		);
		this.state = { coords: { latitude: 0, longitude: 0 } };
	}

	private OnPress() {
	}

	public componentDidMount() { this.mLocationWatcher.Start(); }

	public componentWillUnmount() { this.mLocationWatcher.Stop(); }

	public render() {
		const {
			coords,
			error
		} = this.state;

		if(error) throw error;

		return (
			<View>
				<Text>Location: {`Lat:${coords.latitude}, Lon:${coords.longitude}`}</Text>
				<Text>Name</Text>
				<TextInput onChangeText={(text) => this.mLocationName = text} />
				<Text>Type</Text>
				<TextInput onChangeText={(text) => this.mLocationType = text} />
				<ClearButton onPress={() => this.OnPress()} text={'Submit'} />
			</View>
		);
	}
}
