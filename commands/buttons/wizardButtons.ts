import { Markup } from 'telegraf';

export const chooseStartingTime: Markup = Markup.keyboard([
  ['10:00', '11:00'],
  ['12:00', '13:00']
]).oneTime()
  .resize();

export const chooseNumbers = Markup.keyboard([
  ['1', '2', '3'],
  ['4', '5', '10'],
]).oneTime()
  .resize();
export const chooseProjects = Markup.keyboard([
  ['4nextLab', 'bitCluster'],
  ['Blot', 'KW'],
]).oneTime()
  .resize();

export const saveOrNo = Markup.keyboard([
  ['Save', 'Don\'t save']
]).oneTime()
  .resize();

export const buttonNo = Markup.keyboard([
  ['No']
]).oneTime()
  .resize();

export const callsCount = Markup.keyboard([
  ['1', '2'],
  ['3', '4'],
]).oneTime()
  .resize();
  
export const callslength = Markup.keyboard([
  ['0 hour', '1 hour'],
  ['2 hours', '3 hours'],
]).oneTime()
  .resize();
  export const chooseFinishingTime: Markup = Markup.keyboard([
    ['16:00', '18:00'],
    ['20:00', '24:00']
  ]).oneTime()
    .resize();