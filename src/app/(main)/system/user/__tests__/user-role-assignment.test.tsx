// Copyright (c) 2025 FastWeb and/or its affiliates. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import httpClient from '@/lib/http';
import UserPage from '../page';

// Mock the httpClient
vi.mock('@/lib/http', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

// Mock other dependencies
vi.mock('@/service/user', () => ({
  useUsers: () => ({
    users: [
      {
        id: '1',
        username: 'testuser',
        nickname: 'Test User',
        avatar_url: '',
        status: 1,
        remark: '',
        create_time: '2025-01-01T00:00:00Z',
      },
    ],
    total: 1,
    isLoading: false,
    mutateUsers: vi.fn(),
  }),
  batchCreateUsers: vi.fn(),
  batchDeleteUser: vi.fn(),
  createUser: vi.fn(),
  deleteUser: vi.fn(),
  exportUser: vi.fn(),
  importUser: vi.fn(),
  updateUser: vi.fn(),
}));

vi.mock('@/service/role', () => ({
  useRoles: () => ({
    roles: [
      { id: 'role1', name: 'Admin', code: 'admin' },
      { id: 'role2', name: 'User', code: 'user' },
    ],
    total: 2,
    isLoading: false,
  }),
}));

vi.mock('@/service/user-role', () => ({
  assignUserRoles: vi.fn(),
}));

vi.mock('@/service/dict-datum', () => ({
  useDictDataOptions: () => ({
    dictData: {
      user_status: [
        { value: '1', label: 'Active' },
        { value: '0', label: 'Inactive' },
      ],
    },
  }),
}));

describe('User Role Assignment Bug Fix', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and display existing user roles when opening assign role modal', async () => {
    // Mock the API response for existing user roles
    const mockUserRoles = {
      records: [
        { id: '1', role_id: 'role1', create_time: '2025-01-01T00:00:00Z' },
      ],
      total: 1,
    };

    (httpClient.get as any).mockResolvedValue(mockUserRoles);

    render(<UserPage />);

    // Find and click the assign role button
    const assignRoleButton = screen.getByText('分配角色');
    fireEvent.click(assignRoleButton);

    // Wait for the modal to open and API call to complete
    await waitFor(() => {
      expect(httpClient.get).toHaveBeenCalledWith('/userRoles', {
        user_id: '1',
        current: 1,
        page_size: 1000,
      });
    });

    // Check if the modal is visible
    expect(screen.getByText('分配角色')).toBeInTheDocument();
    
    // Check if the form is populated with user information
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
  });

  it('should handle API errors gracefully when fetching existing user roles', async () => {
    // Mock API error
    (httpClient.get as any).mockRejectedValue(new Error('API Error'));

    render(<UserPage />);

    // Find and click the assign role button
    const assignRoleButton = screen.getByText('分配角色');
    fireEvent.click(assignRoleButton);

    // Wait for the modal to open even when API fails
    await waitFor(() => {
      expect(screen.getByText('分配角色')).toBeInTheDocument();
    });

    // Check if the form is still populated with basic user information
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
  });
});