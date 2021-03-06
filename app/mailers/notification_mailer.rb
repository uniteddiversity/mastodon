# frozen_string_literal: true

class NotificationMailer < ApplicationMailer
  helper StreamEntriesHelper

  def mention(mentioned_account, status)
    @me     = mentioned_account
    @status = status

    return unless @me.user.settings(:notification_emails).mention

    I18n.with_locale(@me.user.locale || I18n.default_locale) do
      mail to: @me.user.email, subject: I18n.t('notification_mailer.mention.subject', name: @status.account.acct)
    end
  end

  def follow(followed_account, follower)
    @me      = followed_account
    @account = follower

    return unless @me.user.settings(:notification_emails).follow

    I18n.with_locale(@me.user.locale || I18n.default_locale) do
      mail to: @me.user.email, subject: I18n.t('notification_mailer.follow.subject', name: @account.acct)
    end
  end

  def favourite(target_status, from_account)
    @me      = target_status.account
    @account = from_account
    @status  = target_status

    return unless @me.user.settings(:notification_emails).favourite

    I18n.with_locale(@me.user.locale || I18n.default_locale) do
      mail to: @me.user.email, subject: I18n.t('notification_mailer.favourite.subject', name: @account.acct)
    end
  end

  def reblog(target_status, from_account)
    @me      = target_status.account
    @account = from_account
    @status  = target_status

    return unless @me.user.settings(:notification_emails).reblog

    I18n.with_locale(@me.user.locale || I18n.default_locale) do
      mail to: @me.user.email, subject: I18n.t('notification_mailer.reblog.subject', name: @account.acct)
    end
  end
end
