import { Button } from '@react-navigation/elements';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text } from 'react-native';
import { getPageContent } from './DataLoader';
import { handleError } from './ErrorHandler';
import { styles } from './styles';
import { ContentLine } from './types';


function ContentFrame() {
  const [content, setContent] = useState<ContentLine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const pageContent = await getPageContent();
      setContent(pageContent);
      setLoading(false);
    };
    loadContent();
  }, []);

  const renderItem = (item: ContentLine, index: number) => {
    switch (item.type) {
      case 'heading':
        return <Text key={index} style={styles.heading}>{item.data}</Text>;
      case 'text':
        return <Text key={index} style={styles.text}>{item.data}</Text>;
      case 'button':
        return <Button key={index} style={styles.button}>{item.data}</Button>;
      default:
        handleError("Unknown item.type: ${item.type}");
        return null;
    }
  };

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />
  ) : (
    <ScrollView>
      {content.map((item, index) => renderItem(item, index))}
    </ScrollView>
  );
};

export default ContentFrame;