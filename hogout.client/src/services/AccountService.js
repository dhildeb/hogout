import { get } from 'jquery'
import { AppState } from '../AppState'
import { Profile } from '../models/Profile'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editProfile(newProfile) {
    try {
      const res = await api.put('/account/', newProfile)
      logger.log(res.data)
      AppState.account = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getProfileChallenges(id) {
    try {
      const res = await api.get(`challenges/${id}/challenges`)
      logger.log(res.data)
    } catch (error) {
      logger.log(error)
    }
  }

  async getUserAttempts(id) {
    try {
      const res = await api.get(`api/attempts/account/${id}/attempts`)
      logger.log(res.data)
    } catch (error) {
      logger.log(error)
    }
  }

  async getProfile(profileId) {
    try {
      const res = await api.get('/account/' + profileId)
      AppState.activeProfile = new Profile(res.data)
    } catch (error) {
      logger.log(error)
    }
  }
}

export const accountService = new AccountService()
