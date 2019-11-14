import React from 'react';
import {View, AsyncStorage, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { exportCard } from '../../utils/exportCards';

class CardDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.runId = this.props.navigation.getParam('runId', {});
    };

    onExport = () => {
        this.props.runList.map( (item) => {
            if (item.id == this.runId) {
                exportCard(item);
            }
        });
    }

    render() {
        return (
            <SafeAreaView>
                <Text h3>Details</Text>
                {this.props.runList.map( (item) => {
                    return (
                    item.id == this.runId && (
                    <View key={item.id}>
                        <Text>Enfant : {item.child}</Text>
                        <Text>Type : {item.type}</Text>
                        <Text>Date : {item.timestamp}</Text>  
                    </View>
                    ))
                })}
                <Button
                    title="Exporter"
                    onPress={onExport}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({token, runList}) => ({
    token,
    runList
});

const mapDispatchToProps = (dispatch, props) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsScreen);

// <Text>Distance : {item.run.totalDist / 1000}km</Text>
//                         <Text>Temps : {(this.run.summary.totalTime / 3600).toFixed(0)}h{((this.summary.totalTime / 60) % 60).toFixed(0)}min</Text>
//                         <Text>Péage : {this.summary.tollCost.car}€</Text>
//                         <Text>Coût carburant : {this.summary.consumption}€</Text>