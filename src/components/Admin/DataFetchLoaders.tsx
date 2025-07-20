import { Group, Loader, Text } from "@mantine/core";

interface DataFetchLoadersProps {
  text: string;
}

const DataFetchLoaders = ({ text }: DataFetchLoadersProps) => {
  return (
    <Group gap="xs">
      <Loader size="sm" />
      <Text>{text}</Text>
    </Group>
  );
};

export default DataFetchLoaders;
