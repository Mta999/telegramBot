import { Markup } from 'telegraf';

export const chooseTime: Markup = Markup.keyboard([
  ['11:00', '12:00'],
  ['13:00', 'Choose other time']
]).oneTime()
  .resize();

export const chooseNumbers = Markup.keyboard([
  ['1', '2'],
  ['5', '10']
]).oneTime()
  .resize();

export const chooseProjects = Markup.keyboard([
  ['4nextLab', 'bitCluster'],
  ['Blot', 'KW'],
  ['Other, please write which']
]).oneTime()
  .resize();


export const chooseProjectOrNo = Markup.keyboard([
  ['4nextLab', 'bitCluster'],
  ['Blot', 'KW'],
  ['No']
]).oneTime()
  .resize();

export const saveOrNo = Markup.keyboard([
  ['Save', 'Don\'t save']
]).oneTime()
  .resize();