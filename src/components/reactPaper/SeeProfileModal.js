import { View, Text } from 'react-native'
import React from 'react'
import { Modal } from 'react-native-paper'

import { styles } from '../../style/Global'
import { Avatar } from '../common'

const SeeProfileModal = ({ isModalOpen, closeModal, profileUrl }) => (
  <Modal visible={isModalOpen} onDismiss={closeModal}>
    <View className={`${styles.flexCenter}`}>
      <Avatar imgUrl={profileUrl} size={200} />
    </View>
  </Modal>
);

export default SeeProfileModal