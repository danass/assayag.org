import { Mongo } from 'meteor/mongo';

export const TasksCollection = new Mongo.Collection('tasks');
export const TwitterCollection = new Mongo.Collection('twitter');
export const SocialNetworkscollection = new Mongo.Collection('socialnetworks');
