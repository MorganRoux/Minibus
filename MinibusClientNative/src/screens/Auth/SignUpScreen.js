import React from 'react';
import {View, AsyncStorage, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import {updateToken, updateUserName} from '../../store/actions/authActions';
import {signUp, checkToken} from '../../api/api';

class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName : '',
            email: '',
            password: '',
            errorMessage: ''
        }
    };

    async componentWillMount() {
        const storedToken = await AsyncStorage.getItem('token');
        const {errorMessage, userName} = await checkToken(storedToken);
        if(!errorMessage) {
            this.props.updateToken(storedToken);
            this.props.updateUserName(userName);
            this.props.navigation.navigate('mainFlow');
        }
        else
            this.setState( () => ({errorMessage}));
    }
    onEmailChange = (email) => {
        this.setState ( () => ({email}));
    };
    onUserNameChange = (userName) => {
        this.setState ( () => ({userName}));
    };
    onPasswordChange = (password) => {
        this.setState ( () => ({password}));
    };
    onSignUp = async () => {
        const {token, errorMessage} = await signUp(this.state.userName, this.state.email, this.state.password);
        if(errorMessage || !token) {
            this.setState( () => ({errorMessage}));
        }
        else {
        this.setState( () => ({errorMessage: ''}));
        this.props.updateToken(token);
        this.props.updateUserName(this.state.userName);
        await AsyncStorage.setItem('token', token);
        this.props.navigation.navigate('mainFlow');
        }
    }
    onGoToSignIn = () => {
        this.props.navigation.navigate('SignIn');
    }
    render() {
        return (
        <View style={styles.container}>
            <Text h3>Sign up for Minibus</Text>
            <Text>{this.state.errorMessage}</Text>
            <Text>{this.props.token}</Text>
            <Input 
                label="Username"  
                value={this.state.userName}
                onChangeText={this.onUserNameChange}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Input 
                label="Email"  
                value={this.state.email}
                onChangeText={this.onEmailChange}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Input 
                secureTextEntry={true}
                label="Password"
                value={this.state.password}
                onChangeText={this.onPasswordChange} 
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button 
                title="Sign up"
                onPress={this.onSignUp} 
            />
            <Button
                title="Go to sign In"
                onPress={this.onGoToSignIn}
            />
        </View>
        )
    }
};

SignUpScreen.navigationOptions = () => {
    return {
        header: null
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    }
});

const mapStateToProps = ({token}) => ({
    token
});
const mapDispatchToProps = (dispatch, props) => ({
    updateToken: (token) => dispatch(updateToken(token)),
    updateUserName: (userName) => dispatch(updateUserName(userName))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);