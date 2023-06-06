import React from 'react'
import { Badge } from 'react-native-paper'

const BadgeNotif = ({ num }) => (
  <Badge className="absolute -top-1 -right-1">{num}</Badge>
);

export default BadgeNotif