import { onSnapshot } from "firebase/firestore";

const getCollectionData = async (
  collectionRef,
  setCountFn,
  setRelationshipFn,
  loggedInUserId
) => {
  onSnapshot(collectionRef, (response) => {
    const data = response.docs.map((doc) => doc.data());
    setCountFn(data.length);
    if (loggedInUserId) {
      const relationship = data.find((item) => item.userId === loggedInUserId);
      setRelationshipFn(relationship);
    }
  });
};

export default getCollectionData;
