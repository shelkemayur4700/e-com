import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {primaryBlack, primaryred} from '../constant';
import {StackActions} from '@react-navigation/native';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {Avatar, Icon, ListItem} from '@rneui/base';
import {List2} from '../Assets/data';

const Detail = ({navigation}) => {
  const [expanded, setExpanded] = useState(!expanded);
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={primaryred} />
      <ScrollView>
        {/* -----------header  */}
        <View style={styles.hearder}>
          {/* ----------Back button  */}
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack('MainRoute', {
                  screen: 'Home',
                });
              }}>
              <IoniconsIcons
                name="chevron-back"
                color={primaryBlack}
                size={22}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.headingText}>Short Dress</Text>
          {/* ------Share button  */}
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack('MainRoute', {
                  screen: 'Home',
                });
              }}>
              <EntypoIcons name="share" color={primaryBlack} size={22} />
            </TouchableOpacity>
          </View>
        </View>
        {/* -----------image  */}
        <View style={styles.Detail_Img}>
          <Image
            style={styles.Detail_Img1}
            source={require('../Assets/Images/DetailImg.png')}></Image>
          <Image
            style={styles.Detail_Img2}
            source={require('../Assets/Images/DetailImg2.png')}></Image>
        </View>
        {/* --------------  Footer  */}
        <View style={styles.footer}>
          <View style={styles.SizeContainer}>
            <ListItem.Accordion
              content={
                <>
                  <ListItem.Content>
                    <ListItem.Title>List Accordion</ListItem.Title>
                  </ListItem.Content>
                </>
              }
              isExpanded={expanded}
              onPress={() => {
                setExpanded(!expanded);
              }}>
              {List2.map((l, i) => (
                <ListItem key={i} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                    <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              ))}
            </ListItem.Accordion>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  hearder: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
    padding: 15,
    shadowColor: primaryBlack,
  },
  headingText: {
    color: primaryBlack,
    fontFamily: 'Metropolis-SemiBold',
    fontSize: 18,
  },
  Detail_Img: {
    flex: 3,
    flexDirection: 'row',
    gap: 5,
  },
  footer: {
    flex: 1,
  },
  SizeContainer: {
    flex: 1,
    width: 200,
    borderRadius: 50,
  },
});
