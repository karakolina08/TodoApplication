-- =============================================
-- Author:		Carolina Benavides
-- Create date: 09-03-2017
-- Description:	Data Base schema of todo application
-- =============================================

CREATE TABLE [dbo].[TdRole](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[Name] [nvarchar](max) NULL,
	[NormalizedName] [nvarchar](max) NULL,
 CONSTRAINT [PK_TdRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))
GO

CREATE TABLE [dbo].[TdUserToken](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[LoginProvider] [nvarchar](max) NULL,
	[Name] [nvarchar](max) NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_TdUserToken] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
))
GO

CREATE TABLE [dbo].[TdUserRole](
	[RoleId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[TodoRoleId] [int] NULL,
	[TodoUserId] [int] NULL,
 CONSTRAINT [PK_TdUserRole] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC,
	[UserId] ASC
))
GO

CREATE TABLE [dbo].[TdUserLogin](
	[ProviderKey] [varchar](450) NOT NULL,
	[LoginProvider] [varchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [int] NOT NULL,
	[TodoUserId] [int] NULL,
 CONSTRAINT [PK_TdUserLogin] PRIMARY KEY CLUSTERED 
(
	[ProviderKey] ASC,
	[LoginProvider] ASC
))
GO

CREATE TABLE [dbo].[TdUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
	[UserId] [int] NOT NULL,
	[TodoUserId] [int] NULL,
 CONSTRAINT [PK_TdUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))
GO

CREATE TABLE [dbo].[TdRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
	[RoleId] [int] NOT NULL,
	[TodoRoleId] [int] NULL,
 CONSTRAINT [PK_TdRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))
GO

-- Td_User Table
CREATE TABLE [dbo].[Td_User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[NormalizedEmail] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[NormalizedUserName] [nvarchar](max) NULL,
	[UserName] [nvarchar](max) NULL,
	[Name] [nvarchar](100) NULL,
 CONSTRAINT [PK_Td_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))
GO

-- Td_Todo Table
CREATE TABLE [dbo].[Td_Todo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TdUserId] [int] NOT NULL,
	[Description] [nvarchar](max) NULL,
	[DueDate][datetime2](7) NULL,
	[Priority][int] NULL,
	[IsCompleted][bit] NULL,
 CONSTRAINT [PK_Td_Todo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
))
GO

/****** Object:  ForeignKey [FK_Td_Todo_User_TdUserId] ******/
ALTER TABLE [dbo].[Td_Todo]  WITH CHECK ADD  CONSTRAINT [FK_Td_Todo_User_TdUserId] FOREIGN KEY([TdUserId])
REFERENCES [dbo].[Td_User] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Td_Todo] CHECK CONSTRAINT [FK_Td_Todo_User_TdUserId]
GO
/****** Object:  ForeignKey [FK_TdUserClaims_TdUser_TodoUserId] ******/
ALTER TABLE [dbo].[TdUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_TdUserClaims_TdUser_TodoUserId] FOREIGN KEY([TodoUserId])
REFERENCES [dbo].[Td_User] ([Id])
GO
ALTER TABLE [dbo].[TdUserClaims] CHECK CONSTRAINT [FK_TdUserClaims_TdUser_TodoUserId]
GO
/****** Object:  ForeignKey [FK_TdUserLogin_TdUser_TodoUserId] ******/
ALTER TABLE [dbo].[TdUserLogin]  WITH CHECK ADD  CONSTRAINT [FK_TdUserLogin_TdUser_TodoUserId] FOREIGN KEY([TodoUserId])
REFERENCES [dbo].[Td_User] ([Id])
GO
ALTER TABLE [dbo].[TdUserLogin] CHECK CONSTRAINT [FK_TdUserLogin_TdUser_TodoUserId]
GO
/****** Object:  ForeignKey [FK_TdUserRole_TdRole_TodoRoleId] ******/
ALTER TABLE [dbo].[TdUserRole]  WITH CHECK ADD  CONSTRAINT [FK_TdUserRole_TdRole_TodoRoleId] FOREIGN KEY([TodoRoleId])
REFERENCES [dbo].[TdRole] ([Id])
GO
/****** Object:  ForeignKey [FK_TdUserRole_TdUser_TodoUserId] ******/
ALTER TABLE [dbo].[TdUserRole]  WITH CHECK ADD  CONSTRAINT [FK_TdUserRole_TdUser_TodoUserId] FOREIGN KEY([TodoUserId])
REFERENCES [dbo].[Td_User] ([Id])
GO
ALTER TABLE [dbo].[TdUserRole] CHECK CONSTRAINT [FK_TdUserRole_TdUser_TodoUserId]
GO