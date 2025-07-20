"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Alert, Container, Text, Title, Stack } from "@mantine/core";
import { FaExclamationTriangle } from "react-icons/fa";

const NotAdminMessage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container size="sm" py="xl">
      <Stack gap="md" align="center">
        <Alert
          icon={<FaExclamationTriangle size="1rem" />}
          title="Access Denied"
          color="red"
          variant="light"
          w="100%"
        >
          <Text size="sm" mb="xs">
            You do not have administrator privileges to access this page.
          </Text>
          <Text size="xs" c="dimmed">
            Redirecting to home page in 3 seconds...
          </Text>
        </Alert>

        <Title order={3} ta="center" c="dimmed">
          Admin Access Required
        </Title>

        <Text size="sm" ta="center" c="dimmed">
          This page is restricted to administrators only. Please contact your
          system administrator if you believe this is an error.
        </Text>
      </Stack>
    </Container>
  );
};

export default NotAdminMessage;
