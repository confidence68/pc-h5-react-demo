/**
 * User Slice - 用户状态管理
 * 
 * 演示异步操作（Async Thunk）
 * createAsyncThunk 用于处理异步逻辑
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/**
 * 初始状态
 */
const initialState = {
  data: null,
  loading: false,
  error: null
}

/**
 * 异步 Action：获取用户信息
 * 
 * createAsyncThunk 创建一个 thunk action
 * 自动生成三个 action types：
 * - user/fetchUser/pending
 * - user/fetchUser/fulfilled
 * - user/fetchUser/rejected
 */
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, { rejectWithValue }) => {
    try {
      // 模拟 API 请求
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 模拟可能的错误
      if (userId === 0) {
        throw new Error('用户 ID 不能为 0')
      }
      
      // 模拟返回数据
      return {
        id: userId,
        name: `用户 ${userId}`,
        email: `user${userId}@example.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
        role: userId === 1 ? 'admin' : 'user',
        createdAt: new Date().toISOString()
      }
    } catch (error) {
      // 使用 rejectWithValue 返回自定义错误
      return rejectWithValue(error.message)
    }
  }
)

/**
 * 异步 Action：更新用户信息
 */
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, { getState, rejectWithValue }) => {
    try {
      // 可以通过 getState 获取当前状态
      const currentUser = getState().user.data
      
      if (!currentUser) {
        throw new Error('请先获取用户信息')
      }
      
      // 模拟 API 请求
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 返回更新后的用户数据
      return {
        ...currentUser,
        ...userData,
        updatedAt: new Date().toISOString()
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

/**
 * 创建 User Slice
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * 清除用户信息
     */
    clearUser: (state) => {
      state.data = null
      state.error = null
    },
    
    /**
     * 清除错误
     */
    clearError: (state) => {
      state.error = null
    },
    
    /**
     * 本地更新用户（不调用 API）
     */
    setUser: (state, action) => {
      state.data = action.payload
    }
  },
  
  /**
   * 处理异步 action 的不同状态
   * extraReducers 用于响应其他 slice 或 thunk 生成的 action
   */
  extraReducers: (builder) => {
    builder
      // ==================== fetchUser ====================
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
      
      // ==================== updateUser ====================
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  }
})

// 导出 actions
export const { clearUser, clearError, setUser } = userSlice.actions

// 导出 selectors
export const selectUser = (state) => state.user.data
export const selectUserLoading = (state) => state.user.loading
export const selectUserError = (state) => state.user.error

export default userSlice.reducer

