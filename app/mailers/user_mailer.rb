# frozen_string_literal: true

class UserMailer < Devise::Mailer
  default from: ENV.fetch('SMTP_FROM_ADDRESS') { 'notifications@localhost' }
  layout 'mailer'

  def confirmation_instructions(user, token)
    @resource = user
    @token    = token

    I18n.with_locale(@resource.locale || I18n.default_locale) do
      mail to: @resource.email
    end
  end

  def reset_password_instructions(user, token)
    @resource = user
    @token    = token

    I18n.with_locale(@resource.locale || I18n.default_locale) do
      mail to: @resource.email
    end
  end

  def password_change(user)
    @resource = user

    I18n.with_locale(@resource.locale || I18n.default_locale) do
      mail to: @resource.email
    end
  end
end
